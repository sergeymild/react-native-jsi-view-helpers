//
//  Scroller.swift
//  JsiViewHelpers
//
//  Created by sergeymild on 31/07/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

import Foundation
import React

@objc
open class Scroller: NSObject {
    @objc
    public static func scrollToView(
        scrollView: RCTScrollView,
        view: UIView,
        offset: CGFloat,
        scrollToEnd: Bool,
        animated: Bool
    ) {
        scrollView.scrollView.scrollToView(
            view: view,
            offset: offset,
            scrollToEnd: scrollToEnd,
            animated: animated
        )
    }
    
    @objc
    public static func findInParent(
        parent: UIView,
        nativeID: String
    ) -> UIView? {
        return parent.find(nativeID)
    }
}

fileprivate extension UIView {
    func find(_ nId: String) -> UIView? {
        if self.nativeID == nId || self.accessibilityIdentifier == nId {
            return self
        }

        for subview in subviews {
            if let v = subview.find(nId) { return v }
        }

        return nil
    }
}

fileprivate extension UIScrollView {

    // Scroll to a specific view so that it's top is at the top our scrollview
    func scrollToView(
        view: UIView,
        offset: CGFloat,
        scrollToEnd: Bool,
        animated: Bool
    ) {
        if let origin = view.superview {
            // Get the Y position of your child view
            let childStartPoint = origin.convert(view.frame.origin, to: self)
            // Scroll to a rectangle starting at the Y of your subview, with a height of the scrollview
            
            let isHorizontal = contentSize.width > self.frame.size.width
            
            var x = childStartPoint.x - offset
            var y = childStartPoint.y - offset
            if scrollToEnd { y += view.frame.height }
            if scrollToEnd { x += view.frame.width }
            self.scrollRectToVisible(CGRect(
                x: isHorizontal ? x : 0,
                y: !isHorizontal ? y : 0,
                width: isHorizontal ? self.frame.width : 1,
                height: !isHorizontal ? self.frame.height : 1
            ), animated: animated)
        }
    }
}
