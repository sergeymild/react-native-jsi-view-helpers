//
// Created by Sergei Golishnikov on 06/03/2022.
//

#include "JsiViewHelpers.h"

#include <utility>
#include "iostream"

using namespace facebook;
using namespace facebook::jni;

using TSelf = local_ref<HybridClass<JsiViewHelpers>::jhybriddata>;

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
    return facebook::jni::initialize(vm, [] {
        JsiViewHelpers::registerNatives();
    });
}

// JNI binding
void JsiViewHelpers::registerNatives() {
    __android_log_print(ANDROID_LOG_VERBOSE, "😇", "registerNatives");
    registerHybrid({
                           makeNativeMethod("initHybrid",
                                            JsiViewHelpers::initHybrid),
                           makeNativeMethod("installJSIBindings",
                                            JsiViewHelpers::installJSIBindings),
                   });
}

void JsiViewHelpers::installJSIBindings() {
    __android_log_print(ANDROID_LOG_VERBOSE, "😇", "registerJsiBindings");

    auto measureText = jsi::Function::createFromHostFunction(
            *runtime_,
            jsi::PropNameID::forUtf8(*runtime_, "measureText"),
            1,
            [=](jsi::Runtime &runtime,
                const jsi::Value &thisArg,
                const jsi::Value *args,
                size_t count) -> jsi::Value {
                auto params = args[0].asObject(runtime);

                __android_log_print(ANDROID_LOG_VERBOSE,"😇", "measureText");

                jni::local_ref<jstring> fontFamily = nullptr;
                jni::local_ref<jstring> fontWeight = nullptr;
                auto allowFontScaling = true;
                auto usePreciseWidth = false;

                std::string rawString = params
                        .getProperty(runtime, "text")
                        .asString(runtime)
                        .utf8(runtime);

                if (params.hasProperty(runtime, "fontFamily")) {
                    std::string rawFontFamily = params
                            .getProperty(runtime, "fontFamily")
                            .asString(runtime)
                            .utf8(runtime);
                    fontFamily = jni::make_jstring(rawFontFamily);
                }

                if (params.hasProperty(runtime, "weight")) {
                    std::string rawWeight = params
                            .getProperty(runtime, "weight")
                            .asString(runtime)
                            .utf8(runtime);
                    fontWeight = jni::make_jstring(rawWeight);
                }

                if (params.hasProperty(runtime, "allowFontScaling")) {
                    bool allow = params.getProperty(runtime, "allowFontScaling").getBool();
                    allowFontScaling = allow;
                }

                if (params.hasProperty(runtime, "usePreciseWidth")) {
                    bool allow = params.getProperty(runtime, "usePreciseWidth").getBool();
                    usePreciseWidth = allow;
                }

                double fontSize = params
                        .getProperty(runtime, "fontSize")
                        .asNumber();

                double width = params
                        .getProperty(runtime, "maxWidth")
                        .asNumber();

                auto text = jni::make_jstring(rawString);

                auto method = javaPart_->getClass()->getMethod<jni::JArrayDouble(jni::local_ref<JString>, jni::local_ref<JString>, jni::local_ref<JString>, jdouble, jdouble, jboolean, jboolean)>("measureText");


                auto jarray1 = method(javaPart_.get(), text, fontFamily, fontWeight, fontSize, width, usePreciseWidth, allowFontScaling);
                auto a = jarray1->pin();
                // {height, width, lineCount, lastLineWidth}

                auto result = jsi::Object(runtime);
                result.setProperty(runtime, "height", jsi::Value((double)a[0]));
                result.setProperty(runtime, "width", jsi::Value((double)a[1]));
                result.setProperty(runtime, "lineCount", jsi::Value((double)a[2]));
                result.setProperty(runtime, "lastLineWidth", jsi::Value((double)a[3]));

                a.release();
                return result;
            });


    auto measureView = jsi::Function::createFromHostFunction(
            *runtime_,
            jsi::PropNameID::forUtf8(*runtime_, "measureView"),
            1,
            [=](jsi::Runtime &runtime,
                const jsi::Value &thisArg,
                const jsi::Value *args,
                size_t count) -> jsi::Value {
                auto result = jsi::Object(runtime);

                auto method = javaPart_->getClass()->getMethod<jni::JArrayDouble(jdouble)>("measureView");
                auto jarray1 = method(javaPart_.get(), args[0].asNumber());
                auto a = jarray1->pin();

                result.setProperty(runtime, "x", (double)a[2]);
                result.setProperty(runtime, "y", (double)a[3]);
                result.setProperty(runtime, "width", (double)a[4]);
                result.setProperty(runtime, "height", (double)a[5]);

                a.release();
                return result;
            });



    jsi::Object viewHelpers = jsi::Object(*runtime_);
    viewHelpers.setProperty(*runtime_, "measureView", std::move(measureView));
    viewHelpers.setProperty(*runtime_, "measureText", std::move(measureText));
    runtime_->global().setProperty(*runtime_, "__viewHelpers", std::move(viewHelpers));
}


JsiViewHelpers::JsiViewHelpers(
        jni::alias_ref<JsiViewHelpers::javaobject> jThis,
        jsi::Runtime *rt)
        : javaPart_(jni::make_global(jThis)),
          runtime_(rt){}

// JNI init
TSelf JsiViewHelpers::initHybrid(
        alias_ref<jhybridobject> jThis,
        jlong jsContext,
        jni::alias_ref<facebook::react::CallInvokerHolder::javaobject>
        jsCallInvokerHolder) {

    __android_log_write(ANDROID_LOG_INFO, "🥲", "initHybrid...");
    return makeCxxInstance(jThis, (jsi::Runtime *) jsContext);
}
