//
// Created by Sergei Golishnikov on 06/03/2022.
//

#include <fbjni/fbjni.h>
#include <jsi/jsi.h>
#include <ReactCommon/CallInvokerHolder.h>

class JsiViewHelpers : public facebook::jni::HybridClass<JsiViewHelpers> {

public:
    static constexpr auto kJavaDescriptor = "Lcom/reactnativejsiviewhelpers/JsiViewHelpers;";
    static facebook::jni::local_ref<jhybriddata> initHybrid(
            facebook::jni::alias_ref<jhybridobject> jThis,
            jlong jsContext,
            facebook::jni::alias_ref<facebook::react::CallInvokerHolder::javaobject> jsCallInvokerHolder);

    static void registerNatives();

    void installJSIBindings();

private:
    friend HybridBase;
    facebook::jni::global_ref<JsiViewHelpers::javaobject> javaPart_;
    facebook::jsi::Runtime *runtime_;
    explicit JsiViewHelpers(
            facebook::jni::alias_ref<JsiViewHelpers::jhybridobject> jThis,
            facebook::jsi::Runtime *rt);
};


