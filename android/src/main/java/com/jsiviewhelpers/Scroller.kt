package com.jsiviewhelpers

import android.app.Activity
import android.graphics.Rect
import android.view.View
import android.widget.ScrollView
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.util.ReactFindViewUtil
import com.facebook.react.views.scroll.ReactHorizontalScrollView
import com.facebook.react.views.scroll.ReactScrollView
import com.facebook.react.views.swiperefresh.ReactSwipeRefreshLayout

object Scroller {
    fun findView(context: ReactContext?, viewId: Int): View? {
        try {
            if (context != null) {
                val uiManager = UIManagerHelper.getUIManager(context, viewId) ?: return null
                return uiManager.resolveView(viewId)
            }
            return null
        } catch (e: Throwable) {
            e.printStackTrace()
        }
        return null
    }

    @JvmStatic
    fun scrollToChild(
            context: ReactContext?,
            currentActivity: Activity,
            scrollNativeID: String?,
            scrollViewId: Double,
            childNativeID: String?,
            offset: Double,
            scrollToEnd: Boolean
    ) {
        currentActivity.runOnUiThread {
            var scrollView: View? = null
            if (scrollNativeID != null) {
                scrollView = ReactFindViewUtil.findView(currentActivity.findViewById(android.R.id.content), scrollNativeID)
            } else if (scrollViewId != -1.0) {
                scrollView = findView(context, scrollViewId.toInt())
            }
            if (scrollView == null) return@runOnUiThread
            val childView = ReactFindViewUtil.findView(scrollView, childNativeID ?: "")
                    ?: return@runOnUiThread
            if (scrollView is ReactSwipeRefreshLayout) {
              scrollView = scrollView.getChildAt(0)
            }
            if (scrollView is ReactScrollView) {
              scrollView.scrollTo(childView, scrollToEnd, offset.toInt())
            } else if (scrollView is ReactHorizontalScrollView) {
              scrollView.scrollTo(childView, scrollToEnd, offset.toInt())
            }
        }
    }
}

fun ScrollView.scrollTo(
  child: View,
  scrollToChildBottom: Boolean,
  offset: Int
) {
  val myViewRect = Rect()
  child.getDrawingRect(myViewRect)

  offsetDescendantRectToMyCoords(child, myViewRect)
  val scrollDelta: Int = this.scrollDeltaToGetChildRectOnScreen(myViewRect, scrollToChildBottom, offset)
  if (scrollDelta != 0) {
    smoothScrollBy(0, scrollDelta)
  }
}

fun ReactHorizontalScrollView.scrollTo(
  child: View,
  scrollToChildBottom: Boolean,
  offset: Int
) {
  val myViewRect = Rect()
  child.getDrawingRect(myViewRect)

  offsetDescendantRectToMyCoords(child, myViewRect)
  val scrollDelta: Int = this.scrollDeltaToGetChildRectOnScreen(myViewRect, scrollToChildBottom, offset)
  if (scrollDelta != 0) {
    smoothScrollBy(scrollDelta, 0)
  }
}

fun ScrollView.scrollDeltaToGetChildRectOnScreen(
  rect: Rect,
  scrollToChildBottom: Boolean,
  offset: Int
): Int {
  if (childCount == 0) return 0
  val screenTop = scrollY
  var scrollYDelta = 0
  scrollYDelta -= if (scrollToChildBottom) {
    screenTop - rect.bottom
  } else {
    screenTop - rect.top
  }
  scrollYDelta -= offset

  // make sure we aren't scrolling any further than the top our content
  scrollYDelta = scrollYDelta.coerceAtLeast(-scrollY)
  return scrollYDelta
}

fun ReactHorizontalScrollView.scrollDeltaToGetChildRectOnScreen(
  rect: Rect,
  scrollToChildBottom: Boolean,
  offset: Int
): Int {
  if (childCount == 0) return 0
  val screenTop = scrollX
  var scrollYDelta = 0
  scrollYDelta -= if (scrollToChildBottom) {
    screenTop - rect.right
  } else {
    screenTop - rect.left
  }
  scrollYDelta -= offset

  // make sure we aren't scrolling any further than the top our content
  scrollYDelta = scrollYDelta.coerceAtLeast(-scrollX)
  return scrollYDelta
}

